import { Component, OnInit } from '@angular/core'
// import { CategoryService } from '../../shared/services/category.service'
import { ProductService, Product, Category } from 'shared/services/product.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/take'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>
  product: Product = {title: '', price: null, imageUrl: '', category: null}
  key: string
  buttonText = 'Save'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ps: ProductService
  ) {
    this.categories$ = ps.getCategories()
    this.key = this.route.snapshot.paramMap.get('id')
    if (this.key) {
      this.ps.get(this.key).take(1).subscribe(p => this.product = p)
    }
  }

  save(product) {
    if (this.key) {
      this.ps.update(this.key, product).toPromise().then((_success) => {
        console.log(`update success: ${_success}`)
        this.router.navigate(['/admin/products'])
      })
    } else {
      this.ps.create(product).toPromise().then(() => {
        this.router.navigate(['/admin/products'])
      })
    }
  }

  delete() {
    // be sure to make button that calls this method type=button otherwise form is submitted also
    if (this.key && confirm('Are you sure you want to delete this product?')) {
      this.ps.delete(this.key).toPromise().then(() => {
        this.router.navigate(['/admin/products'])
      })
    }
  }

  ngOnInit() {
    if (!this.key) { this.buttonText = 'Create' }
  }

}
