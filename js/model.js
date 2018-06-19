

const model = {
    // lists
    lists: [
        {
            id: '_8er9bgfka',
            title: 'Todo',
            cards: [
                {
                    id: '_hpe3lbbja',
                    text: 'wash the dishes',
                    members: [
                        '_sioy9cpwk', '_6jo650ic4'
                    ]
                },
                {
                    id: '_38bkwdonk',
                    text: 'Do De LANDRY',
                    members: [
                        '_sioy9cpwk'
                    ]
                },
                {
                    id: '_kxo8gqz4t',
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
                    id: '_o6jvpz751',
                    text: 'btn game',
                    members: [
                        '_sioy9cpwk'
                    ]
                },
                {
                    id: '_s5u1oqyif',
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
                    id: '_qpkgj1c9b',
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
                    id: '_0n2j4tjzc',
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
    },

    addList: function (title) {
        let newList = {
            id: model.idGenerator(),
            title: title,
            cards: []
        }
        model.lists.push(newList);
    },

    addCard: function (cardText, cardMembers, listId) {
        let newCard = {
            id: model.idGenerator(),
            text: cardText,
            members: cardMembers
        }
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === listId) {
                model.lists[i].cards.push(newCard);
                break;
            }
        }
    },

    editListTitle: function (ListTitle, listId) {
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === listId) {
                model.lists[i].title = ListTitle;
                break;
            }
        }
    },

    editCard: function (cardId, cardText, cardMembers, listIdOld, listIdNew) {
        let newCard = {
            id: cardId,
            text: cardText,
            members: cardMembers
        }
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === listIdOld) {
                for (let j = 0; j < model.lists[i].cards.length; j++) {
                    if (model.lists[i].cards[j] === cardId) {
                        if (listIdOld === listIdNew) {
                            model.lists[i].cards.splice(j, 1, newCard);
                        }
                        else {
                            model.lists[i].cards.splice(j, 1);
                            for (let k = 0; k < model.lists.length; k++) {
                                if (model.lists[k].id === listIdNew) {
                                    model.lists[k].cards.push(newCard);
                                }
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    },

    deleteList: function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === id) {
                model.lists.splice(i, 1);
                break;
            }
        }
    },

    deleteCard: function (cardId, listId) {
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === listId) {
                for (let j = 0; j < model.lists[i].cards.length; j++) {
                    if (model.lists[i].cards[j] === cardId) {
                        model.lists[i].cards.splice(j, 1);
                        break;
                    }
                }
                break;
            }
        }
    },

    addMember: function (fullName) {
        let newMember = {
            id: model.idGenerator(),
            "fullName": fullName
        }
        model.members.push(newMember);
    },

    deleteMember: function (id) {
        for (let i = 0; i < model.members.length; i++) {
            if (model.members[i].id === id) {
                model.members.splice(i, 1);
                break;
            }
        }
    }
};