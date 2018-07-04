let model = {
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
            cards: []
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

    addList: function () {
        let newList = {
            id: model.idGenerator(),
            title: '',
            cards: []
        }
        model.lists.push(newList);
        model.saveModelToLocalStorage();
    },

    addCard: function (cardText, cardMembers, listId) {
        let newCard = {
            id: model.idGenerator(),
            text: cardText,
            members: cardMembers
        }
        const list = model.getListById(listId);
        list.cards.push(newCard);
        model.saveModelToLocalStorage();
    },

    editListTitle: function (listTitle, listId) {
        const list = model.getListById(listId);
        if (listTitle == '') {
            list.title = '(no title)';
        }
        else {
            list.title = listTitle.trim();
        }
        model.saveModelToLocalStorage();
    },

    editCard: function (cardId, cardText, cardMembers, listIdOld, listIdNew) {
        let newCard = {
            id: cardId,
            text: cardText,
            members: cardMembers
        }
        const oldList = model.getListById(listIdOld);
        const newList = model.getListById(listIdNew);
        const cardIndex = model.getCardIndexById(cardId);

        if (listIdOld === listIdNew) {
            oldList.cards.splice(cardIndex, 1, newCard);
        }
        else {
            oldList.cards.splice(cardIndex, 1);
            newList.cards.push(newCard);
        }
        model.saveModelToLocalStorage();
    },

    deleteList: function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === id) {
                model.lists.splice(i, 1);
                break;
            }
        }
        model.saveModelToLocalStorage();
    },

    deleteCard: function (cardId, listId) {
        const list = model.getListById(listId);
        const cardIndex = model.getCardIndexById(cardId);
        list.cards.splice(cardIndex, 1);
        model.saveModelToLocalStorage();
    },

    addMember: function (fullName) {
        let newMember = {
            id: model.idGenerator(),
            fullName: fullName.trim()
        }
        model.members.push(newMember);
        model.saveModelToLocalStorage();
    },

    editMember: function (fullName, memberId) {
        const member = model.getMemberById(memberId);
        member.fullName = fullName;
        model.saveModelToLocalStorage();
    },

    deleteMember: function (id) {
        for (let i = 0; i < model.members.length; i++) {
            if (model.members[i].id === id) {
                model.members.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < model.lists.length; i++) {
            for (let j = 0; j < model.lists[i].cards.length; j++) {
                for (let k = 0; k < model.lists[i].cards[j].members.length; k++) {
                    if (model.lists[i].cards[j].members[k] === id) {
                        model.lists[i].cards[j].members.splice(k, 1);
                        break;
                    }
                }
            }
        }
        model.saveModelToLocalStorage();
    },

    getListById: function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === id) {
                return model.lists[i];
                break;
            }
        }
    },

    getCardById: function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            for (let j = 0; j < model.lists[i].cards.length; j++) {
                if (model.lists[i].cards[j].id === id) {
                    return model.lists[i].cards[j];
                    break;
                }
            }
        }
    },

    getCardIndexById: function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            for (let j = 0; j < model.lists[i].cards.length; j++) {
                if (model.lists[i].cards[j].id === id) {
                    return j;
                    break;
                }
            }
        }
    },

    getMemberById: function (id) {
        for (let i = 0; i < model.members.length; i++) {
            if (model.members[i].id === id) {
                return model.members[i];
                break;
            }
        }
    },

    saveModelToLocalStorage: function () {
        const modelJSON = model.JSON.stringify();
        localStorage.setItem('model', modelJSON);
    }
};