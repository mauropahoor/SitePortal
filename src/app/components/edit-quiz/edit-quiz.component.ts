import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/interfaces/config';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  configuration: Config = {
    questions: 0,
    answers: 0
  };
  quiz: Quiz[] = [];


  showConfigQuiz = true;
  showCreateQuiz = false;
  sucess = false;

  saveConfig(questions: string, answers: string){
    /* Question --> Number of questions 
       Answers --> Possibility of answer to each question
       Ex: What is your name? 1-Bruno, 2-Luis (1 question and 2 answers)
    */
    let questionInt = parseInt(questions);
    let answerInt = parseInt(answers);
    this.configuration = {questions: questionInt, answers: answerInt};
    for(let i = 0;i < questionInt; i++){
      /* Create empty Quiz vector */
      this.quiz.push({enunciation:'', correct:0, answers: [].constructor(answerInt)});
    }
    this.showConfigQuiz = false;
    this.showCreateQuiz = true;
  }
  async createQuiz(){
    /* Get inputs information and put in the quiz array */
    for(let i = 0;i < this.quiz.length;i++){
      const inputEnunciation = document.getElementById(`enunciate${i}`) as HTMLInputElement | null;
      const valueEnunciation = inputEnunciation?.value;
      this.quiz[i].enunciation = valueEnunciation;

      const inputCorrect = document.getElementById(`correct${i}`) as HTMLInputElement | null;
      const valueCorrect = inputCorrect?.value;
      this.quiz[i].correct = valueCorrect;

      for(let j = 0;j < this.configuration.answers;j++){
        const inputAnswer = document.getElementById(`answer${i}${j}`) as HTMLInputElement | null;
        const valueAnswer = inputAnswer?.value;
        this.quiz[i].answers[j] = valueAnswer;
      }
    }
    await this.quizService.createQuiz(this.quiz, this.configuration.questions, this.configuration.answers);
    this.sucess = true;
    setTimeout(() => { this.sucess = false; }, 3000);
  }
}
