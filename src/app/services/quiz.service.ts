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
    let points = 0;
    for(let i = 0;i < questions.length; i++){
      console.log(questions[i].correct,":Correto");
      console.log(answers[i],":Mandei");

      if(questions[i].correct == answers[i]){
        points++;
      }
    }
    return points
  }
}
