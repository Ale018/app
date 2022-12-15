import {NgModule } from "@angular/core";
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {SidebarModule} from 'primeng/sidebar';
import {ListboxModule} from 'primeng/listbox';
import {SplitButtonModule}from 'primeng/splitbutton';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import {SplitterModule} from 'primeng/splitter';
import {ImageModule} from 'primeng/image';



const mymodules: any = [
    ToolbarModule,
    ButtonModule,
    RippleModule,
    SidebarModule,
    ListboxModule,
    SplitButtonModule,
    CarouselModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    TableModule,
    DynamicDialogModule,
    DropdownModule,
    SplitterModule,
    ImageModule

];

@NgModule({
    imports: [...mymodules],
    exports: [...mymodules]

})
export class PrimeNgModule{}