package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelAdresse;
import ge.repository.RepositoryAdresse;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerAdresse {

	private final RepositoryAdresse repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerAdresse(RepositoryAdresse repository) {
		this.repository = repository;
	}

	@GetMapping("/allAdresse")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addAdresse")
	ResponseEntity<Object> add(@RequestBody ModelAdresse model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneAdresse/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	

	@GetMapping("/oneAdresseByPeronne/{id}")
	ResponseEntity<Object> oneByPersonne(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.getAdresseByPersonne(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteAdresse/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateAdresse")
	ResponseEntity<Object> update(@RequestBody ModelAdresse model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdAdresse()).map(newModel -> {
						newModel.setPersonne(model.getPersonne());
						newModel.setNumTelephonePerso(model.getNumTelephonePerso());
						newModel.setNumTelephoneSupinfo(model.getNumTelephoneSupinfo());
						newModel.setAdresseEmailPerso(model.getAdresseEmailPerso());
						newModel.setAdresseEmailSupinfo(model.getAdresseEmailSupinfo());
						newModel.setRegion(model.getRegion());
						newModel.setLibelleAdresse(model.getLibelleAdresse());
						newModel.setCodePostal(model.getCodePostal());
						newModel.setVille(model.getVille());
						newModel.setActuel(model.getActuel());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
