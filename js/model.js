const model = {
    // lists
    lists: [
        {
            id: '_8er9bgfka',
            title: 'My first list',
            cards: []
        }
    ],

    //members  
    members: [],

    //functions
    idGenerator: function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    addList: function () {
        let newList = {
            id: model.idGenerator(),
            title: '(no title)',
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
        const listsJSON = JSON.stringify(model.lists);
        const membersJSON = JSON.stringify(model.members);
        localStorage.setItem('modelLists', listsJSON);
        localStorage.setItem('modelMembers', membersJSON);
    }
};