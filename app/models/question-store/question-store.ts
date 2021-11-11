import { flow } from "mobx";
import { getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";
import shuffle from "./shuffler";


/**
 * Model description here for TypeScript hints.
 */
const Ans = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
export const QuestionStoreModel = types
  .model("QuestionStore")
  .props({
    categories: types.optional(types.array(types.frozen()), []),
    isLoading: types.optional(types.boolean, false),
    currentcategory: types.optional(types.frozen(), {}),
    questions: types.optional(types.array(types.frozen()), []),
    mode: types.optional(types.string, 'easy'),
    answers: types.optional(types.array(types.frozen()), Ans),
    given: types.optional(types.number, 0),
    scores: types.optional(types.array(types.frozen()), []),
    diamonds: types.optional(types.number, 0),
    behind: types.optional(types.frozen(), require('../../../assets/images/back.png'))
  })
  .extend(withEnvironment)
  .actions(self => ({
    changeWall(data: any) {
      self.behind = data
    },
    setCategory(data: any) {
      self.categories.replace(data)
    },
    setOneCat(data: string) {
      self.currentcategory = data
    },
    setMode(data: string) {
      self.mode = data
    },
    setQuestion(data: any) {
      self.questions.replace(data)
    },
    setGiven() {
      self.given = self.scores.length + 1
    },
    defaultGiven() {
      self.given = self.scores.length;
    },
    setScore(data: any) {
      self.scores.replace(data)
    },
    setDiamond(data: number) {
      self.diamonds = self.diamonds + data;
    },
    onDone() {
      var array1: any = {
        paper: self.given,
        answer: getSnapshot(self.answers)
      }
      var array2: any = getSnapshot(self.scores)
      var added: any = array2.concat(array1)
      this.setScore(added)
      var count = 0;
      self.answers.forEach((item) => {
        if (item.ticked == item.correct_answer) {
          count++;
        }
      })
      this.setDiamond(count)
    },
    hintUsed() {
      self.diamonds = self.diamonds - 1
    },
    clearAns() {
      let empty: any = Ans
      self.answers = empty
    },
    clearScore() {
      let empty: any = []
      self.scores = empty
    },
    clearQue() {
      let empty: any = []
      self.questions = empty
    }
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getCategory: flow(function* getCategory() {
      try {
        const res = yield self.environment.api.getCat();
        self.setCategory(res.list)
        console.log('*****')
        console.log(res)
        return { response: true, message: "Success" };
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    // getCategory: async () => {
    //   const characterApi = self.environment.api
    //   const result = await characterApi.getCat()

    //   if (result.kind === "ok") {
    //     self.setCategory(result)
    //   } else {
    //     __DEV__ && console.tron.log(result)
    //   }
    // },
    getQuestion: flow(function* getQuestion() {
      try {
        const res = yield self.environment.api.getPaper(self.currentcategory.id, self.mode);
        self.setQuestion(res.list)
        console.log(res.list)
        return { response: true, message: "Success" };
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    addAnswer(data: any) {
      self.answers.splice((data.quenum - 1), 1, data)
      // if (self.answers.length == 0) {
      //   self.answers.push(data)
      // } else {
      //   let isThere = self.answers.findIndex(x => (x.category == data.category) && (x.question == data.question) && (x.difficulty == data.difficulty) && (x.type == data.type) && (x.correct_answer == data.correct_answer) && (x.quenum == data.quenum) && (x.papernum == data.papernum))
      //   if (isThere == -1) {
      //     self.answers.push(data)
      //   } else {
      //     self.answers.splice(isThere, 1, data)
      //   }
      // }
    },
    removeAnswer(data: any) {
      //   let isThere = self.answers.findIndex(x => (x.category == data.category) && (x.question == data.question) && (x.difficulty == data.difficulty) && (x.type == data.type) && (x.correct_answer == data.correct_answer) && (x.quenum == data.quenum) && (x.papernum == data.papernum))
      self.answers.splice((data.quenum - 1), 1, {})
    },
    addScore() {
      self.answers.forEach((item, index) => {
        if (JSON.stringify(self.answers[index]) == '{}') {
          var combo: any = self.questions[index].incorrect_answers;
          var done: any = combo.concat(self.questions[index].correct_answer)
          let repul = {
            ...self.questions[index],
            quenum: index + 1,
            papernum: self.given,
            ticked: '',
            mcq: shuffle(done)
          }
          self.answers.splice(index, 1, repul)
        }
      })
      self.onDone()
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
/**
 * [
 * {
 * paper:1,
 * answer:[]
 * }
 * ]
 */

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type QuestionStoreType = Instance<typeof QuestionStoreModel>
export interface QuestionStore extends QuestionStoreType { }
type QuestionStoreSnapshotType = SnapshotOut<typeof QuestionStoreModel>
export interface QuestionStoreSnapshot extends QuestionStoreSnapshotType { }
export const createQuestionStoreDefaultModel = () => types.optional(QuestionStoreModel, {})
