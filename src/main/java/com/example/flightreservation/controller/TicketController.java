package com.example.flightreservation.controller;

import com.example.flightreservation.model.FlightTicket;
import com.example.flightreservation.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public FlightTicket createTicket(@RequestBody FlightTicket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping
    public List<FlightTicket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/search/address")
    public List<FlightTicket> searchByAddress(@RequestParam String address) {
        return ticketService.searchByAddress(address);
    }

    @GetMapping("/search/destination")
    public List<FlightTicket> searchByDestination(@RequestParam String destination) {
        return ticketService.searchByDestination(destination);
    }

    @GetMapping("/search/kickoff")
    public List<FlightTicket> searchByKickoff(@RequestParam String kickoff) {
        return ticketService.searchByKickoff(kickoff);
    }
}
