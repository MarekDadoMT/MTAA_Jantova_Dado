import uuid from 'uuid';
import * as firebase from 'firebase';
import { Alert } from 'react-native';
import { sha256 } from 'react-native-sha256';

// Zdroj: https://blog.jscrambler.com/create-a-react-native-image-recognition-app-with-google-vision-api/

class fb {
   
    constructor() {

    }

    login(password, username) {

        return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/auth?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {

            if(response.status !== 200) {
                Alert.alert("Wrong username or password...");
            }
            else {
                let token = response['_bodyText'];
                return token;
            }
        })
    }

async addToDatabase(url, state, token, author) {


    var obj = { author: author, category: state.category, image: url,  text: state.text, title: state.title};
    var myJSON = JSON.stringify(obj);

    console.log(myJSON);
    
    return fetch(
        `https://us-central1-mtaa-f5627.cloudfunctions.net/addArticle?token=${token}`, {
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

async showArticle(id, token) {

  return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/getArticleId?key=${id}&token=${token}`, {
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

async showArticleCategory(category, token) {

    return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/getArticleCategory?category=${category}&token=${token}`, {
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

async showData(token) {
        return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/getArticles?token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            var articles = JSON.parse(response['_bodyText']);
            //console.log(articles);
            return articles;
        })


}

async deteleData(id, token) {
    //console.log(id);
    return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/deleteArticle?key=${id}&token=${token}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if(response.status !== 200) {
            //Alert.alert("Article was not DELETED from database", "Try again");
        }
        else {
           // Alert.alert("Success", "Article was DELETED")
        }
    });
}

async updateData(id, state, token) {

    console.log(state.text);

    var obj = { text: state.text};
    var myJSON = JSON.stringify(obj);

   console.log(myJSON);
    
   
    return fetch(`https://us-central1-mtaa-f5627.cloudfunctions.net/updateArticle?key=${id}&token=${token}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: myJSON
    }).then((response) => {
        
        if(response.status !== 200) {
            Alert.alert("Article was not updated.");
        }
        else {
            Alert.alert("Success", "Article was updated.")
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

fb.instance = new fb();
fb.instance.token = '';
fb.instance.author = '';
export default fb;
