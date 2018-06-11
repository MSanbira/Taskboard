

const model = {
    // lists
    lists: [
        {
            id: 'jfjfjfj',
            title: 'Todo',
            cards: [
                {
                    text: 'wash the dishes',
                    members: [
                        'kumumk', 'vfvfefv'
                    ]
                },
                {
                    text: 'Do De LANDRY',
                    members: [
                        'kumumk'
                    ]
                },
                {
                    text: 'here is anouther card to put on the list to finally see if the css is worcking ok, and there are no members. just a few more words to see what happends',
                    members: []
                }
            ]
        },
        {
            id: 'jjkfjfj',
            title: 'done',
            cards: [
                {
                    text: 'btn game',
                    members: [
                        'kumumk'
                    ]
                },
                {
                    text: 'macking a nice breackfest for my wife',
                    members: [
                        'kumumk'
                    ]
                }
            ]
        },
        {
            id: 'jfjkgfj',
            title: 'in prog',
            cards: [
                {
                    text: 'Transatlantic is the best band!',
                    members: []
                }
            ]
        },
        {
            id: 'jqwfjfj',
            title: 'one more',
            cards: [
                {
                    text: 'ok cool',
                    members: []
                }
            ]
        }
    ],

    //members  
    members: [
        {
            id: 'kumumk',
            fullName: 'Matan Nahoom Sanbira'
        },
        {
            id: 'vfvfefv',
            fullName: 'Dima V'
        }
    ],

    //functions
    idGenerator: function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
};