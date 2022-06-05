package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelAcces;
import ge.repository.RepositoryAcces;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerAcces {

	private final RepositoryAcces repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerAcces(RepositoryAcces repository) {
		this.repository = repository;
	}

	@GetMapping("/allAcces")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addAcces")
	ResponseEntity<Object> add(@RequestBody ModelAcces model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneAcces/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteAcces/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateAcces")
	ResponseEntity<Object> update(@RequestBody ModelAcces model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdAcces()).map(newModel -> {
						newModel.setCodeAcces(model.getCodeAcces());
						newModel.setLibelleAcces(model.getLibelleAcces());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
