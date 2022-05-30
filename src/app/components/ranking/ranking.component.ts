import { Component, OnInit } from '@angular/core';
import { Ranking } from 'src/app/interfaces/ranking';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getRank();
  }

  ranking: Ranking[] = [];

  async getRank(){
    this.ranking = await this.quizService.getRanking();
  }
}
