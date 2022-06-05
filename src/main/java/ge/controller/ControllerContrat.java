package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelContrat;
import ge.repository.RepositoryContrat;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerContrat {

	private final RepositoryContrat repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerContrat(RepositoryContrat repository) {
		this.repository = repository;
	}

	@GetMapping("/allContrat")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@GetMapping("/contratDispoMemoire")
	ResponseEntity<Object> contratDispoMemoire() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.contratDispoMemoire());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addContrat")
	ResponseEntity<Object> add(@RequestBody ModelContrat model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneContrat/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteContrat/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateContrat")
	ResponseEntity<Object> update(@RequestBody ModelContrat model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdContrat()).map(newModel -> {
						newModel.setEntreprise(model.getEntreprise());
						newModel.setTypeContrat(model.getTypeContrat());
						newModel.setDureeContrat(model.getDureeContrat());
						newModel.setNomPrenomEncadreur(model.getNomPrenomEncadreur());
						newModel.setTelephoneEncadreur(model.getTelephoneEncadreur());
						newModel.setAdresseEmailEncadreur(model.getAdresseEmailEncadreur());
						newModel.setDateDebutContrat(model.getDateDebutContrat());
						newModel.setDateFinContrat(model.getDateFinContrat());
						newModel.setFichierContrat(model.getFichierContrat());
						newModel.setFichierConvention(model.getFichierConvention());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
