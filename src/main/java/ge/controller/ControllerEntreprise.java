package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelEntreprise;
import ge.repository.RepositoryEntreprise;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerEntreprise {

	private final RepositoryEntreprise repository;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerEntreprise(RepositoryEntreprise repository) {
		this.repository = repository;
	}

	@GetMapping("/allEntreprise")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addEntreprise")
	ResponseEntity<Object> add(@RequestBody ModelEntreprise model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.save(model));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneEntreprise/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repository.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteEntreprise/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@PostMapping("/updateEntreprise")
	ResponseEntity<Object> update(@RequestBody ModelEntreprise model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repository.findById(model.getIdEntreprise()).map(newModel -> {
						newModel.setNomEntreprise(model.getNomEntreprise());
						newModel.setSecteurActiviteEntreprise(model.getSecteurActiviteEntreprise());
						newModel.setAdresseEntreprise(model.getAdresseEntreprise());
						newModel.setCodePostalEntreprise(model.getCodePostalEntreprise());
						newModel.setVilleEntreprise(model.getVilleEntreprise());
						newModel.setTelephoneEntreprise(model.getTelephoneEntreprise());
						newModel.setResponsableEntreprise(model.getResponsableEntreprise());
						newModel.setMailEntreprise(model.getMailEntreprise());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repository.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
