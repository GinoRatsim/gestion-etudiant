package ge.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ge.model.ModelAdresse;
import ge.model.ModelAnneeScolaire;
import ge.model.ModelEtudiant;
import ge.model.ModelLogin;
import ge.model.ModelPEAL;
import ge.model.ModelPersonne;
import ge.repository.RepositoryAcces;
import ge.repository.RepositoryAdresse;
import ge.repository.RepositoryAnneeScolaire;
import ge.repository.RepositoryEtudiant;
import ge.repository.RepositoryLogin;
import ge.repository.RepositoryModule;
import ge.repository.RepositoryNotes;
import ge.repository.RepositoryPersonne;
import ge.utils.ResponseHandler;

@RestController
@CrossOrigin(origins = { "*" }, maxAge = 4800, allowCredentials = "false")
public class ControllerEtudiant<E> {

	private final RepositoryEtudiant repositoryEtudiant;
	private final RepositoryAdresse repositoryAdresse;
	private final RepositoryModule repositoryModule;
	private final RepositoryNotes repositoryNotes;
	private final RepositoryPersonne repositoryPersonne;
	private final RepositoryLogin repositoryLogin;
	private final RepositoryAcces repositoryAcces;
	private final RepositoryAnneeScolaire repositoryAnneeScolaire;
	ResponseHandler responseHandler = new ResponseHandler();

	ControllerEtudiant(RepositoryEtudiant repositoryEtudiant, RepositoryAdresse repositoryAdresse,
			RepositoryModule repositoryModule, RepositoryNotes repositoryNotes, RepositoryPersonne repositoryPersonne,
			RepositoryLogin repositoryLogin, RepositoryAcces repositoryAcces,
			RepositoryAnneeScolaire repositoryAnneeScolaire) {
		this.repositoryEtudiant = repositoryEtudiant;
		this.repositoryAdresse = repositoryAdresse;
		this.repositoryModule = repositoryModule;
		this.repositoryNotes = repositoryNotes;
		this.repositoryPersonne = repositoryPersonne;
		this.repositoryLogin = repositoryLogin;
		this.repositoryAcces = repositoryAcces;
		this.repositoryAnneeScolaire = repositoryAnneeScolaire;
	}

	@GetMapping("/getTauxReussiteEchec")
	ResponseEntity<Object> getTauxReussiteEchec() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, tauxReussiteEchec());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/allEtudiant")
	ResponseEntity<Object> all() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryEtudiant.findAll());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/allEtudiantActuel")
	ResponseEntity<Object> allEtudiantActuel() {
		try {
			return responseHandler.generateResponse(HttpStatus.OK, repositoryEtudiant.getEtudiantsActuel());
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/addEtudiant")
	ResponseEntity<Object> add(@RequestBody ModelPEAL modelPEAL) {
		try {
			ModelPersonne personne = modelPEAL.getPersonne();
			ModelEtudiant etudiant = modelPEAL.getEtudiant();
			ModelAdresse adresse = modelPEAL.getAdresse();
			ModelLogin login = modelPEAL.getLogin();

			if (repositoryPersonne.save(personne) != null) {
				ModelPersonne personneAdd = repositoryPersonne.getPersonne(personne.getIdentifiant(), personne.getNom(),
						personne.getNomUsage(), personne.getPrenoms(), personne.getSexe());
				etudiant.setPersonne(personneAdd);
				adresse.setPersonne(personneAdd);
				login.setPersonne(personneAdd);
				login.setAccesModel(repositoryAcces.getAccesEtudiant());
				repositoryEtudiant.save(etudiant);
				repositoryAdresse.save(adresse);
				repositoryLogin.save(login);
			}

			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/oneEtudiant/{id}")
	ResponseEntity<Object> one(@PathVariable Long id) {
		try {
			Object[] res = new Object[4];
			res[0] = repositoryEtudiant.findById(id);
			res[1] = repositoryAdresse
					.getAdresseByPersonne(repositoryEtudiant.findById(id).get().getPersonne().getIdPersonne());
			res[2] = repositoryModule
					.findModuleByNiveau(repositoryEtudiant.findById(id).get().getNiveau().getIdNiveau());
			res[3] = repositoryNotes.findNoteByEtudiant(repositoryEtudiant.findById(id).get().getIdEtudiant());

			return responseHandler.generateResponse(HttpStatus.OK, res);
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@GetMapping("/deleteEtudiant/{id}")
	ResponseEntity<Object> delete(@PathVariable Long id) {
		try {
			repositoryEtudiant.deleteById(id);
			return responseHandler.generateResponse(HttpStatus.OK, "");
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	@PostMapping("/updateEtudiant")
	ResponseEntity<Object> update(@RequestBody ModelEtudiant model) {
		try {
			return responseHandler.generateResponse(HttpStatus.OK,
					repositoryEtudiant.findById(model.getIdEtudiant()).map(newModel -> {
						newModel.setContrat(model.getContrat());
						newModel.setPersonne(model.getPersonne());
						newModel.setNiveau(model.getNiveau());
						newModel.setSpecialite(model.getSpecialite());
						newModel.setTypeFormation(model.getTypeFormation());
						newModel.setCreditTotalObtenus(model.getCreditTotalObtenus());
						newModel.setCampus(model.getCampus());
						newModel.setActuel(model.getActuel());
						newModel.setAnneeScolaire(model.getAnneeScolaire());
						newModel.setAdmis(model.getAdmis());
						return responseHandler.generateResponse(HttpStatus.NOT_FOUND,
								repositoryEtudiant.save(newModel));
					}));
		} catch (Exception e) {
			return responseHandler.generateResponse(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

	public List<Object[]> tauxReussiteEchec() {
		List<Object[]> rep = new ArrayList<Object[]>();

		List<ModelAnneeScolaire> anneeScolaire = repositoryAnneeScolaire.findAll();
		
		List<Object[]> totalNiveau = repositoryEtudiant.getTotalParNiveau(2L);
		List<Object[]> totalAdmis = repositoryEtudiant.getTotalParAdmis(2L);
		List<Object[]> totalNonAdmis = repositoryEtudiant.getTotalParNonAdmis(2L);

		for (Object[] niv : totalNiveau) {
			for(Object[] adm : totalAdmis) {
				if(niv[0].equals(adm[0])) {

				}
			}
		}
		
		return rep;
	}

}
