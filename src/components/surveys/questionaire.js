import { QuestionModel, QuestionType, ChoiceOption } from '@ditdot-dev/vue-flow-form';

const questions = [
    new QuestionModel({
        title: 'Questions',
        type: QuestionType.SectionBreak
    }),
    new QuestionModel({
        title: 'How did you like the service today?',
        type: QuestionType.MultipleChoice,
        required: true,
        options: [
        new ChoiceOption({
            label: 'Very Good'
        }),
        new ChoiceOption({
            label: 'Good'
        }),
        new ChoiceOption({
            label: 'Average'
        }),
        new ChoiceOption({
            label: 'Bad'
        }),
        new ChoiceOption({
            label: 'Very Bad'
        })
        ]
    }),
    new QuestionModel({
        title: 'Any other feedback?',
        type: QuestionType.Text,
        required: false
    }),
    new QuestionModel({
        title: 'Please leave your email address',
        type: QuestionType.Email,
        required: false
    })
]

export default questions;