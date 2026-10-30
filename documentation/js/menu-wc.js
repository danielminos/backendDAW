'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backgw documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' :
                                            'id="xs-controllers-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' }>
                                            <li class="link">
                                                <a href="controllers/LoginController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' :
                                        'id="xs-injectables-links-module-AuthModule-821a1f0b935ee1ab359db1862b23effd8ed3357469435d6ddd73484f6435ff9fcc145bf768d3bbda28e909eb0fee75988a61f89fc4cd5bc1756e649a0580070a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthServices</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsuariosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TurnosModule.html" data-type="entity-link" >TurnosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' : 'data-bs-target="#xs-controllers-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' :
                                            'id="xs-controllers-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' }>
                                            <li class="link">
                                                <a href="controllers/AdministradorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdministradorController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/MedicosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicosController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PacientesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PacientesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' : 'data-bs-target="#xs-injectables-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' :
                                        'id="xs-injectables-links-module-TurnosModule-5ea6d06d89916aa3ae8a66f9605b9567f7374132a6c1f6ea13d00b7327d32e3f09478ab0b0bfe6dba077b1a513bb8a3ef2ef1150898c8fc4e840f5276ae8e3b9"' }>
                                        <li class="link">
                                            <a href="injectables/MedicosServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicosServices</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TurnosServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TurnosServices</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdministradorController.html" data-type="entity-link" >AdministradorController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LoginController.html" data-type="entity-link" >LoginController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MedicosController.html" data-type="entity-link" >MedicosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PacientesController.html" data-type="entity-link" >PacientesController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Medico.html" data-type="entity-link" >Medico</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Reserva.html" data-type="entity-link" >Reserva</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Usuario.html" data-type="entity-link" >Usuario</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateTurnoDTO.html" data-type="entity-link" >CreateTurnoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTurnoPacienteDTO.html" data-type="entity-link" >CreateTurnoPacienteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdResponseDTO.html" data-type="entity-link" >IdResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListMedicosDTO.html" data-type="entity-link" >ListMedicosDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListPacientesDTO.html" data-type="entity-link" >ListPacientesDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListPacientesMedicoDTO.html" data-type="entity-link" >ListPacientesMedicoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListTurnosAdminDTO.html" data-type="entity-link" >ListTurnosAdminDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListTurnosMedicoQueryDTO.html" data-type="entity-link" >ListTurnosMedicoQueryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListTurnosPacienteDTO.html" data-type="entity-link" >ListTurnosPacienteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDTO.html" data-type="entity-link" >LoginDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDTO.html" data-type="entity-link" >LoginResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/MigracionInicial1790771564539.html" data-type="entity-link" >MigracionInicial1790771564539</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTurnoDTO.html" data-type="entity-link" >UpdateTurnoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateValorConsultaDTO.html" data-type="entity-link" >UpdateValorConsultaDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthServices.html" data-type="entity-link" >AuthServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicosServices.html" data-type="entity-link" >MedicosServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TurnosServices.html" data-type="entity-link" >TurnosServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosService.html" data-type="entity-link" >UsuariosService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
