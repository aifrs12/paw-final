import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Lance } from '../lances.model';
import { LancesService } from '../lances.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Estado } from '../Enums/estado';

@Component({
    selector: 'app-lances-create',
    templateUrl: './lances-create.component.html',
    styleUrls: ['./lances-create.component.css']
})


export class LancesCreateComponent implements OnInit {

    public criarLances: FormGroup;

    lances: Lance[] = [];

    isAuthenticated = false;
    userid: string;
    private userSub: Subscription;
    private authenticationsSub: Subscription;
    estado: Estado;



    constructor(
        private formBuilder: FormBuilder,
        public lancesService: LancesService,
        private authService: AuthService
    ) {
        this.criarLances = this.formBuilder.group({
            user: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            estado: ['']

        });
    }
    onAddLance() {

        this.lancesService.addLance(
            this.criarLances.value.user,
            this.criarLances.value.valor,
            this.estado = Estado.PROCESSAMENTO
        );
        console.log(this.criarLances);

        this.criarLances.reset();
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.getIsAuth();
        this.userid = this.authService.getToken();

    }


}
