package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelLogin;
import ge.model.ModelPL;
import ge.model.ModelPersonne;
import ge.repository.RepositoryLogin;
import ge.repository.RepositoryPersonne;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerLogin {

	private final RepositoryPersonne repositoryPersonne;
	private final RepositoryLogin repositoryLogin;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerLogin(RepositoryPersonne repositoryPersonne, RepositoryLogin repositoryLogin) {
		this.repositoryPersonne = repositoryPersonne;
		this.repositoryLogin = repositoryLogin;
	}

	@GetMapping("/allLogin")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryLogin.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addLogin")
	ResponseEntity<Object> add(@RequestBody ModelPL modelPL) {
		try {

			ModelPersonne personne = modelPL.getPersonne();
			ModelLogin login = modelPL.getLogin();

			if (repositoryPersonne.save(personne) != null) {
				ModelPersonne personneAdd = repositoryPersonne.getPersonne(personne.getIdentifiant(), personne.getNom(), personne.getNomUsage(), personne.getPrenoms(), personne.getSexe());
				login.setPersonne(personneAdd);
				repositoryLogin.save(login);
			}

			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneLogin/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryLogin.findById(id));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteLogin/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repositoryLogin.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/updateLogin")
	ResponseEntity<Object> update(@RequestBody ModelLogin model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repositoryLogin.findById(model.getIdLogin()).map(newModel -> {
						newModel.setUser(model.getUser());
						newModel.setPass(model.getPass());
						newModel.setAccesModel(model.getAccesModel());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND, repositoryLogin.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/connexion")
	ResponseEntity<Object> connexion(@RequestBody ModelLogin model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repositoryLogin.findLoginByUserAndPass(model.getUser(), model.getPass()));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
