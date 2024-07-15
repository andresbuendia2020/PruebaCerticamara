import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  bookForm: FormGroup;
  book: Book | null = null;


  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.bookForm = this.fb.group({
      id: [null],
      title: [''],
      author: [''],
      publishedDate: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBooks().subscribe(book => {
        this.book = book.find(b => b.id === id +id) || null;
        if(this.book){
          this.bookForm.setValue(this.book);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.value.id) {
      this.bookService.updateBook(this.bookForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.bookService.addBook(this.bookForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
