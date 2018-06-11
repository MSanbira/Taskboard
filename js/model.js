

const model = {
    // lists
    lists: [
        {
            id: '_8er9bgfka',
            title: 'Todo',
            cards: [
                {
                    text: 'wash the dishes',
                    members: [
                        '_sioy9cpwk', '_6jo650ic4'
                    ]
                },
                {
                    text: 'Do De LANDRY',
                    members: [
                        '_sioy9cpwk'
                    ]
                },
                {
                    text: 'here is anouther card to put on the list to finally see if the css is worcking ok, and there are no members. just a few more words to see what happends',
                    members: []
                }
            ]
        },
        {
            id: '_k3de9v44n',
            title: 'done',
            cards: [
                {
                    text: 'btn game',
                    members: [
                        '_sioy9cpwk'
                    ]
                },
                {
                    text: 'macking a nice breackfest for my wife',
                    members: [
                        '_sioy9cpwk'
                    ]
                }
            ]
        },
        {
            id: '_37crd17o8',
            title: 'in prog',
            cards: [
                {
                    text: 'Transatlantic is the best band!',
                    members: []
                }
            ]
        },
        {
            id: '_qfpkrwmq1',
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
            id: '_sioy9cpwk',
            fullName: 'Matan Nahoom Sanbira'
        },
        {
            id: '_6jo650ic4',
            fullName: 'Dima V'
        }
    ],

    //functions
    idGenerator: function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
};