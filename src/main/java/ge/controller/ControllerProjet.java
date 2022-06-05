package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelProjet;
import ge.repository.RepositoryProjet;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerProjet {

	private final RepositoryProjet repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerProjet(RepositoryProjet repository) {
		this.repository = repository;
	}

	@GetMapping("/allProjet")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addProjet")
	ResponseEntity<Object> add(@RequestBody ModelProjet model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneProjet/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteProjet/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateProjet")
	ResponseEntity<Object> update(@RequestBody ModelProjet model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdProjet()).map(newModel -> {
						newModel.setModule(model.getModule());
						newModel.setDateLimite(model.getDateLimite());
						newModel.setDateSoutenance(model.getDateSoutenance());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
