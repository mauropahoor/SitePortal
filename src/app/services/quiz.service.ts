import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private db: AngularFirestore) { }

  getQuestions(){
    return new Promise<any>((resolve)=> {
      this.db.collection('questions').valueChanges({ idField: 'id'}).subscribe(questions => resolve(questions));
    }) 
  }
  checkAnswers(questions: any[], answers: any[]){
    let result: any[] = [{points: 0}];
    for(let i = 0;i < questions.length; i++){
      if(questions[i].correct == answers[i]){
        result[0].points += 1;
        result.push({answer: "Acertou!!"});
      }
      else{
        result.push({answer: "Errou!!"});
      }
    }
    return result
  }
}
