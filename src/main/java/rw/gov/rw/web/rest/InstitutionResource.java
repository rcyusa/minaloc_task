package rw.gov.rw.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import rw.gov.rw.repository.InstitutionRepository;
import rw.gov.rw.service.InstitutionService;
import rw.gov.rw.service.dto.InstitutionDTO;
import rw.gov.rw.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link rw.gov.rw.domain.Institution}.
 */
@RestController
@RequestMapping("/api")
public class InstitutionResource {

    private final Logger log = LoggerFactory.getLogger(InstitutionResource.class);

    private static final String ENTITY_NAME = "institution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InstitutionService institutionService;

    private final InstitutionRepository institutionRepository;

    public InstitutionResource(InstitutionService institutionService, InstitutionRepository institutionRepository) {
        this.institutionService = institutionService;
        this.institutionRepository = institutionRepository;
    }

    /**
     * {@code POST  /institutions} : Create a new institution.
     *
     * @param institutionDTO the institutionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new institutionDTO, or with status {@code 400 (Bad Request)} if the institution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/institutions")
    public ResponseEntity<InstitutionDTO> createInstitution(@Valid @RequestBody InstitutionDTO institutionDTO) throws URISyntaxException {
        log.debug("REST request to save Institution : {}", institutionDTO);
        if (institutionDTO.getId() != null) {
            throw new BadRequestAlertException("A new institution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InstitutionDTO result = institutionService.save(institutionDTO);
        return ResponseEntity
            .created(new URI("/api/institutions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /institutions/:id} : Updates an existing institution.
     *
     * @param id the id of the institutionDTO to save.
     * @param institutionDTO the institutionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated institutionDTO,
     * or with status {@code 400 (Bad Request)} if the institutionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the institutionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/institutions/{id}")
    public ResponseEntity<InstitutionDTO> updateInstitution(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody InstitutionDTO institutionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Institution : {}, {}", id, institutionDTO);
        if (institutionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, institutionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!institutionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InstitutionDTO result = institutionService.update(institutionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, institutionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /institutions/:id} : Partial updates given fields of an existing institution, field will ignore if it is null
     *
     * @param id the id of the institutionDTO to save.
     * @param institutionDTO the institutionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated institutionDTO,
     * or with status {@code 400 (Bad Request)} if the institutionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the institutionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the institutionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/institutions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InstitutionDTO> partialUpdateInstitution(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody InstitutionDTO institutionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Institution partially : {}, {}", id, institutionDTO);
        if (institutionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, institutionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!institutionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InstitutionDTO> result = institutionService.partialUpdate(institutionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, institutionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /institutions} : get all the institutions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of institutions in body.
     */
    @GetMapping("/institutions")
    public ResponseEntity<List<InstitutionDTO>> getAllInstitutions(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Institutions");
        Page<InstitutionDTO> page = institutionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /institutions/:id} : get the "id" institution.
     *
     * @param id the id of the institutionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the institutionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/institutions/{id}")
    public ResponseEntity<InstitutionDTO> getInstitution(@PathVariable Long id) {
        log.debug("REST request to get Institution : {}", id);
        Optional<InstitutionDTO> institutionDTO = institutionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(institutionDTO);
    }

    /**
     * {@code DELETE  /institutions/:id} : delete the "id" institution.
     *
     * @param id the id of the institutionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/institutions/{id}")
    public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
        log.debug("REST request to delete Institution : {}", id);
        institutionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
