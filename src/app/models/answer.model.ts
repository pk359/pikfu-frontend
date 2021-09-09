export interface IAnswer {
    questionId: number; 
    answerText: string;
    postedBy: string;
    posterName: string;
    postedAt: string;
}
export type IAnswers = Array<IAnswer>