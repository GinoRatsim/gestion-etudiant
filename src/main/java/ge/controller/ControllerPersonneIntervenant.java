package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelPersonneIntervenant;
import ge.repository.RepositoryPersonneIntervenant;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerPersonneIntervenant {

	private final RepositoryPersonneIntervenant repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerPersonneIntervenant(RepositoryPersonneIntervenant repository) {
		this.repository = repository;
	}

	@GetMapping("/allPersonneIntervenant")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addPersonneIntervenant")
	ResponseEntity<Object> add(@RequestBody ModelPersonneIntervenant model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/onePersonneIntervenant/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deletePersonneIntervenant/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updatePersonneIntervenant")
	ResponseEntity<Object> update(@RequestBody ModelPersonneIntervenant model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdPersonneIntervenant()).map(newModel -> {
						newModel.setPersonne(model.getPersonne());
						newModel.setIntervenant(model.getIntervenant());
						newModel.setIdCampus(model.getCampus());
						newModel.setDateDebutSituation(model.getDateDebutSituation());
						newModel.setDateFinSituation(model.getDateFinSituation());
						newModel.setDateDerniereModification(model.getDateDerniereModification());
						newModel.setUtilisateurModif(model.getUtilisateurModif());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
