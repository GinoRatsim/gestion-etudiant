package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelEtudiant;
import ge.repository.RepositoryEtudiant;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerEtudiant {

	private final RepositoryEtudiant repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerEtudiant(RepositoryEtudiant repository) {
		this.repository = repository;
	}

	@GetMapping("/allEtudiant")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addEtudiant")
	ResponseEntity<Object> add(@RequestBody ModelEtudiant model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneEtudiant/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteEtudiant/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateEtudiant")
	ResponseEntity<Object> update(@RequestBody ModelEtudiant model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdEtudiant()).map(newModel -> {
						newModel.setContrat(model.getContrat());
						newModel.setPersonne(model.getPersonne());
						newModel.setNiveau(model.getNiveau());
						newModel.setSpecialite(model.getSpecialite());
						newModel.setTypeFormation(model.getTypeFormation());
						newModel.setDebutAnneeScolaire(model.getDebutAnneeScolaire());
						newModel.setFinAnneeScolaire(model.getFinAnneeScolaire());
						newModel.setCreditTotalObtenus(model.getCreditTotalObtenus());
						newModel.setActuel(model.getActuel());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
