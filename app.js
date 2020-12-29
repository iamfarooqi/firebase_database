// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyA1WJFMayjY8W30X8JhjhLVqD3exO31pEk",
    authDomain: "french-products-list.firebaseapp.com",
    projectId: "french-products-list",
});

var db = firebase.firestore();

function addData() {

    db.collection("orders").add({
        customerName: document.getElementById("name").value,
        orderTitle: "Khoya",
        qtyInLg: 2,
        additionalComments: "",
        address: "jamshed Road, Karachi",
        phoneNumber: "03211234567",
        date: new Date().getTime()
    })
        // when data add then call this function

        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        // if user got any problem while order then function then() will  not working then function catch() will run

        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}



function getDate() {
    db.collection("orders").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("ordersList").innerHTML +=

                `<p>${JSON.stringify(doc.data())}</p>`
        });
    });
}

// db.collection("cities")
//     .onSnapshot(observer);

db.collection("orders")
    .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {


                console.log("New order: ", change.doc.data());
                document.getElementById("ordersList").innerHTML =

                    `<p>${JSON.stringify(change.doc.data())}</p>` + document.getElementById("ordersList").innerHTML



            }
            if (change.type === "modified") {
                console.log("Modified order: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed order: ", change.doc.data());
            }
        });
    });
