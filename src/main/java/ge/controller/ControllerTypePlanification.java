package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelTypePlanification;
import ge.repository.RepositoryTypePlanification;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerTypePlanification {

	private final RepositoryTypePlanification repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerTypePlanification(RepositoryTypePlanification repository) {
		this.repository = repository;
	}

	@GetMapping("/allTypePlanification")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addTypePlanification")
	ResponseEntity<Object> add(@RequestBody ModelTypePlanification model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneTypePlanification/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteTypePlanification/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateTypePlanification")
	ResponseEntity<Object> update(@RequestBody ModelTypePlanification model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdTypePlanification()).map(newModel -> {
						newModel.setLibelleTypePlanification(model.getLibelleTypePlanification());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
