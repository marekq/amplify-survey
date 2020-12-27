import { QuestionModel, QuestionType, ChoiceOption } from '@ditdot-dev/vue-flow-form';

const questions = [
    new QuestionModel({
        title: 'Event survey',
        type: QuestionType.SectionBreak
    }),
    new QuestionModel({
        title: 'Did the event meet your expectations?',
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
        title: 'Which AWS services do you use?',
        type: QuestionType.MultipleChoice,
        multiple: true,
        required: true,
        options: [
            new ChoiceOption({
                label: 'Lambda'
            }),
            new ChoiceOption({
                label: 'DynamoDB'
            }),
            new ChoiceOption({
                label: 'API Gateway'
            })
        ]
    }),
    new QuestionModel({
        title: 'What kind of AWS content do you enjoy most?',
        type: QuestionType.MultipleChoice,
        multiple: true,
        required: true,
        options: [
            new ChoiceOption({
                label: 'Videos'
            }),
            new ChoiceOption({
                label: 'Blogposts'
            }),
            new ChoiceOption({
                label: 'Webinars'
            }),
            new ChoiceOption({
                label: 'Hands on workshops'
            })
        ]
    }),
    new QuestionModel({
        title: 'Any other feedback?',
        type: QuestionType.Text,
        required: false
    }),
    new QuestionModel({
        title: 'Optional - Subscribe to updates from AWS',
        type: QuestionType.Email,
        required: false
    })
]

export default questions;