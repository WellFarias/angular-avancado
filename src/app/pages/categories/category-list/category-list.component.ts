import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model'; 
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => console.log('ERRO AO CARREGAR A LISTA', error)
    )
  }

  deleteCategory(category) {
    const confirmation = confirm("Tem certeza que deseja deletar esta categoria ?");
    if (confirmation) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('Erro ao remover categoria.')
      )
    }
  }

}
