import { QuizConfig } from './quiz-config';
import { Question } from './question';
import { Pager } from './pager';

export class Quiz {
    id: number;
    name: string;
    description: string;
    config: QuizConfig;
    questions: Question[] = [];
    pager: Pager;
    
    // for firebase
    key:string = '';

    constructor(data: any) {
        data = data || {};

        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.config = new QuizConfig(data.config);
        this.pager = new Pager(data.pager);

        this.key = data.$key || '';

        data.questions = data.questions || [];
        data.questions.forEach(q => {
            this.questions.push(new Question(q));
        });
    }
}
