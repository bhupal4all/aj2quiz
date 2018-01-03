import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    hint: string;
    explanation: string;
    isCorrect: boolean;
    quizId: number;

    constructor(data: any) {
        data = data || {};
        
        this.id = data.id;
        this.name = data.name;
        this.quizId = data.quizId || 0;
        this.questionTypeId = data.questionTypeId || 1;
        this.options = [];
        this.hint = data.hint || undefined;
        this.explanation = data.explanation || undefined;
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
