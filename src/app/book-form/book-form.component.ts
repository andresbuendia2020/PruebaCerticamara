import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  book: Book | undefined;
  isEditMode: boolean = false;


  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode = true;
      this.bookService.getBooks().subscribe((books) => {
        this.book = books.find(book => book.id === +bookId);
        if (this.book) {
          this.bookForm.patchValue(this.book);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      if (this.isEditMode && this.book) {
        const updatedBook = { ...this.book, ...this.bookForm.value };
        this.bookService.updateBook(updatedBook).subscribe(() => {
          this.router.navigate(['/books']);
        });
      } else {
        this.bookService.addBook(this.bookForm.value).subscribe(() => {
          this.router.navigate(['/books']);
        });
      }
    }
  }
}
