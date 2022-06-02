import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { Ranking } from '../interfaces/ranking';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private db: AngularFirestore) { }

  getRanking(){
    return new Promise<any>((resolve)=> {
      this.db.collection('ranking', ref => ref.orderBy('position')).valueChanges({ idField: 'id'}).subscribe(ranking => resolve(ranking));
    })
  }
  async updateRanking(name:string, points:number){
    const db = this.db.collection('ranking');
    let ranking: Ranking[] = await this.getRanking();
    let position = 0;
    if(ranking.length < 10){
      for(let i = 0;i < ranking.length;i++){
        if(ranking[i].points <= points){
          position = i+1;
          break;
        }
      }
      for(let i = 0;i < ranking.length;i++){
        //Update every position below the new one to +1
        //This dont let the rank have 2 positions with the same number
        let id = "";
        if(ranking[i].position >= position){
          id = ranking[i].id;
          let newPos = ranking[i].position += 1;
          db.doc(id).update({position: newPos});
        }
      }
      db.add({position: position, name: name, points: points});
    }
    else{
      let lastPosition: Ranking[] = await this.getLastPosition();
      let id = lastPosition[0].id;
      db.doc(id).delete();
      this.updateRanking(name, points);
    }
  }
  getLastPosition(){
    return new Promise<any>((resolve)=> {
      this.db.collection('ranking', ref => ref.where('position', '==', 10)).valueChanges({ idField: 'id'}).subscribe(lastPosition => resolve(lastPosition));
    })
  }

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
  async createQuiz(quiz: any, quizLength: number, answersLength: number){
    const db = this.db.collection('questions');
    let questions: any[] = await this.getQuestions();  
    for(let i = 0; i < questions.length; i++){ 
      //Delete old questions  
      let id = questions[i].id;
      let idString = id.toString();
      db.doc(idString).delete();
    }
    for(let i = 0;i < quizLength; i++){
      //Add the new questions to the database
      let answersArray: any[] = [];
      for(let j = 0; j < answersLength; j++){
        answersArray.push(quiz[i].answers[j]);
      }
      db.add({answers: answersArray, enunciation: quiz[i].enunciation, correct: quiz[i].correct});
    }
  }
}