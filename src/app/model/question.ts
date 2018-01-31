import { Option } from './option';

export class Question {
    id: number = 0;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    hint: string;
    explanation: string;
    isCorrect: boolean;
    quizId: number = 0;
    quizKey: string = '';
    key:string = '';

    constructor(data: any) {
        data = data || {};
        
        this.id = data.id || 0;
        this.name = data.name || '';
        this.quizId = data.quizId || 0;
        this.quizKey = data.quizKey || '';
        this.questionTypeId = data.questionTypeId || 1;
        this.options = [];
        this.hint = data.hint || '';
        this.explanation = data.explanation || '';
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });

        this.key = data.$key || '';
    }
}
