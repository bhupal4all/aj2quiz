export class QuizConfig {
    allowBack: boolean;
    allowReview: boolean;
    autoMove: boolean;  // if boolean; it will move to next question automatically when answered.
    duration: number;  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    pageSize: number;
    requiredAll: boolean;  // indicates if you must answer all the questions before submitting.
    richText: boolean;
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    showClock: boolean;
    showPager: boolean;
    theme: string;

    constructor(data: any) {
        data = data || {};
        this.allowBack = data.allowBack || true;
        this.allowReview = data.allowReview || true;
        this.autoMove = data.autoMove || false;
        this.duration = data.duration || 0;
        this.pageSize = data.pageSize || 1;
        this.requiredAll = data.requiredAll || true;
        this.richText = data.richText || false;
        this.shuffleQuestions = data.shuffleQuestions || true;
        this.shuffleOptions = data.shuffleOptions || true;
        this.showClock = data.showClock || true;
        this.showPager = data.showPager || true;
    }
}
