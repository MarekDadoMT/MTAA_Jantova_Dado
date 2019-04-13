import uuid from 'uuid';
import * as firebase from 'firebase';
import { Alert } from 'react-native';

// Zdroj: https://blog.jscrambler.com/create-a-react-native-image-recognition-app-with-google-vision-api/

class fb {
   
    constructor() {

    }

async addToDatabase(url, state) {

    var obj = { author: "Marek", category: state.category, image: url,  text: state.textovePole, title: state.title};
    var myJSON = JSON.stringify(obj);

    console.log(myJSON);
    
    return fetch(
        'https://us-central1-mtaa-f5627.cloudfunctions.net/addArticle', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: myJSON
    }).then((response) => {
        if(response.status !== 200) {
            Alert.alert("Article was not added to the database", "Missing parameters");
        }
        else {
             Alert.alert("Success", "Article was added")
        }
    });
}

async showArticle(id) {

  return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/getArticleId?key=${id}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    }).then((response) => {
        var article = JSON.parse(response['_bodyText']);
        return article;
    })
}

async showData() {
        return fetch('https://us-central1-mtaa-f5627.cloudfunctions.net/getArticles', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            var articles = JSON.parse(response['_bodyText']);
            return articles;
        })


}

async deteleData(id) {
    console.log(id);
    return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/deleteArticle?key=${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if(response.status !== 200) {
            Alert.alert("Article was not DELETED from database", "naser si");
        }
        else {
            Alert.alert("Success", "Article was DELETED")
        }
    });
}

async updateData(id, text) {
   // console.log(id);
   //console.log(text);
    return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/updateArticle?key=${id}` + `text=${text}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if(response.status !== 200) {
            console.log("ZLE");
            //Alert.alert("Article was not UPDATED from database", "naser si");
        }
        else {
            console.log("DOBRE");
            //Alert.alert("Success", "Article was UPDATED")
        }
    });
}

async uploadImageAsync(uri) {  
  
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    
    const snapshot = await ref.put(blob);

    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }
}

fb.instance = new fb()
export default fb;
