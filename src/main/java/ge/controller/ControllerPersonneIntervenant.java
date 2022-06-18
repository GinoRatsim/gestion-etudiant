package ge.controller;

import java.sql.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelPersonne;
import ge.model.ModelPersonneIntervenant;
import ge.repository.RepositoryPersonne;
import ge.repository.RepositoryPersonneIntervenant;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerPersonneIntervenant {

	private final RepositoryPersonneIntervenant repositoryPersonneIntervenant;
	private final RepositoryPersonne repositoryPersonne;
	
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerPersonneIntervenant(RepositoryPersonneIntervenant repositoryPersonneIntervenant, RepositoryPersonne repositoryPersonne) {
		this.repositoryPersonneIntervenant = repositoryPersonneIntervenant;
		this.repositoryPersonne = repositoryPersonne;
	}

	@GetMapping("/allPersonneIntervenant")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryPersonneIntervenant.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addPersonneIntervenant")
	ResponseEntity<Object> add(@RequestBody ModelPersonneIntervenant model) {
		
		ModelPersonne personne = model.getPersonne();
		
		try {
			if (repositoryPersonne.save(personne) != null) {
				ModelPersonne personneAdd = repositoryPersonne.getPersonne(personne.getIdentifiant(), personne.getNom(), personne.getNomUsage(), personne.getPrenoms(), personne.getSexe());
				model.setPersonne(personneAdd);
				model.setDateDerniereModification(new Date(System.currentTimeMillis()));
				model.setUtilisateurModif(0);
				repositoryPersonneIntervenant.save(model);
			}
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/onePersonneIntervenant/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryPersonneIntervenant.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deletePersonneIntervenant/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repositoryPersonneIntervenant.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updatePersonneIntervenant")
	ResponseEntity<Object> update(@RequestBody ModelPersonneIntervenant model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repositoryPersonneIntervenant.findById(model.getIdPersonneIntervenant()).map(newModel -> {
						newModel.setPersonne(model.getPersonne());
						newModel.setIntervenant(model.getIntervenant());
						newModel.setIdCampus(model.getCampus());
						newModel.setDateDebutSituation(model.getDateDebutSituation());
						newModel.setDateFinSituation(model.getDateFinSituation());
						newModel.setDateDerniereModification(new Date(System.currentTimeMillis()));
						newModel.setUtilisateurModif(1);
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repositoryPersonneIntervenant.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
