package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelNotes;
import ge.repository.RepositoryNotes;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerNotes {

	private final RepositoryNotes repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerNotes(RepositoryNotes repository) {
		this.repository = repository;
	}

	@GetMapping("/allNotes")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@GetMapping("/allNotesRattrapage")
	ResponseEntity<Object> allNotesRattrapage() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.allNotesRattrapage());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addNotes")
	ResponseEntity<Object> add(@RequestBody ModelNotes model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneNotes/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteNotes/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateNotes")
	ResponseEntity<Object> update(@RequestBody ModelNotes model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdNotes()).map(newModel -> {
						newModel.setEtudiant(model.getEtudiant());
						newModel.setModule(model.getModule());
						newModel.setNotes(model.getNotes());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
