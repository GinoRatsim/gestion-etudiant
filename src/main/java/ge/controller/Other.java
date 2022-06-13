package ge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ge.repository.RepositoryEtudiant;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class Other {

	private final RepositoryEtudiant repositoryEtudiant;
	ResponseHandler responseHandler = new ResponseHandler();

	Other(RepositoryEtudiant repositoryEtudiant) {
		this.repositoryEtudiant = repositoryEtudiant;
	}
	
	@GetMapping("/nombreEtudiantByNiveau")
	ResponseEntity<Object> nombreEtudiantByNiveau() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryEtudiant.getNombreEtudiantByNiveau());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@GetMapping("/nombreEtudiantByTypeContrat")
	ResponseEntity<Object> nombreEtudiantByTypeContrat() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryEtudiant.getNombreEtudiantByTypeContrat());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@GetMapping("/nombreEtudiantByTypeFormation")
	ResponseEntity<Object> nombreEtudiantByTypeFormation() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryEtudiant.getNombreEtudiantByTypeFormation());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
