
let model = (function() {

    const lists = [
        {
            id: '_8er9bgfka',
            title: 'My first list',
            cards: []
        }
    ];

    const members = [];

    const idGenerator = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    const saveModelListsToLocalStorage = function () {
        const listsJSON = JSON.stringify(model.lists);
        localStorage.setItem('modelLists', listsJSON);
    }

    const saveModelMembersToLocalStorage = function () {
        const membersJSON = JSON.stringify(model.members);
        localStorage.setItem('modelMembers', membersJSON);
    }

    const addList = function () {
        let newList = {
            id: idGenerator(),
            title: '(no title)',
            cards: []
        }
        model.lists.push(newList);
        saveModelListsToLocalStorage();
    }

    const addCard = function (cardText, cardMembers, listId) {
        let newCard = {
            id: idGenerator(),
            text: cardText,
            members: cardMembers
        }
        const list = getListById(listId);
        list.cards.push(newCard);
        saveModelListsToLocalStorage();
    }

    const editListTitle = function (listTitle, listId) {
        const list = getListById(listId);
        if (listTitle == '') {
            list.title = '(no title)';
        }
        else {
            list.title = listTitle.trim();
        }
        saveModelListsToLocalStorage();
    }

    const editCard = function (cardId, cardText, cardMembers, listIdOld, listIdNew) {
        let newCard = {
            id: cardId,
            text: cardText,
            members: cardMembers
        }
        const oldList = getListById(listIdOld);
        const newList = getListById(listIdNew);
        const cardIndex = getCardIndexById(cardId);

        if (listIdOld === listIdNew) {
            oldList.cards.splice(cardIndex, 1, newCard);
        }
        else {
            oldList.cards.splice(cardIndex, 1);
            newList.cards.push(newCard);
        }
        saveModelListsToLocalStorage();
    }

    const deleteList = function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === id) {
                model.lists.splice(i, 1);
                break;
            }
        }
        saveModelListsToLocalStorage();
    }

    const deleteCard = function (cardId, listId) {
        const list = getListById(listId);
        const cardIndex = getCardIndexById(cardId);
        list.cards.splice(cardIndex, 1);
        saveModelListsToLocalStorage();
    }

    const addMember = function (fullName) {
        let newMember = {
            id: idGenerator(),
            fullName: fullName.trim()
        }
        model.members.push(newMember);
        saveModelMembersToLocalStorage();
    }

    const editMember = function (fullName, memberId) {
        const member = getMemberById(memberId);
        member.fullName = fullName;
        saveModelMembersToLocalStorage();
    }

    const deleteMember = function (id) {
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
        saveModelListsToLocalStorage();
        saveModelMembersToLocalStorage();
    }

    const getListById = function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            if (model.lists[i].id === id) {
                return model.lists[i];
                break;
            }
        }
    }

    const getCardById = function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            for (let j = 0; j < model.lists[i].cards.length; j++) {
                if (model.lists[i].cards[j].id === id) {
                    return model.lists[i].cards[j];
                    break;
                }
            }
        }
    }

    const getCardIndexById = function (id) {
        for (let i = 0; i < model.lists.length; i++) {
            for (let j = 0; j < model.lists[i].cards.length; j++) {
                if (model.lists[i].cards[j].id === id) {
                    return j;
                    break;
                }
            }
        }
    }

    const getMemberById = function (id) {
        for (let i = 0; i < model.members.length; i++) {
            if (model.members[i].id === id) {
                return model.members[i];
                break;
            }
        }
    }

    return {
        lists: lists,
        members: members,
        addList: addList,
        addCard: addCard,
        editListTitle: editListTitle,
        editCard: editCard,
        deleteList: deleteList,
        deleteCard: deleteCard,
        addMember: addMember,
        editMember: editMember,
        deleteMember: deleteMember,
        getListById: getListById,
        getCardById: getCardById
    };
})();