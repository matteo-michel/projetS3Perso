import { Component, OnInit } from '@angular/core';
import { Book } from '../class/book';
import {BookService} from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BookService]
})
export class HomeComponent implements OnInit {
  b: Book ;
  book: string;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(
      data => { console.log(data);
                let json = JSON.parse(JSON.stringify(data));
                // console.log(json);
                this.book = String(json['0']['isbn']);
                // console.log(this.book);

                this.b = new Book(this.book);
                // console.log(this.b);
      },
      err => console.error(err),
      () => {console.log('done');
             // console.log(this.b);

      });

  }
}
