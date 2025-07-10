package com.example.flightreservation.service;

import com.example.flightreservation.model.FlightTicket;
import com.example.flightreservation.repository.FlightTicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    private final FlightTicketRepository ticketRepository;

    public TicketService(FlightTicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public FlightTicket createTicket(FlightTicket ticket) {
        return ticketRepository.save(ticket);
    }

    public List<FlightTicket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<FlightTicket> searchByAddress(String address) {
        return ticketRepository.findByAddressContainingIgnoreCase(address);
    }

    public List<FlightTicket> searchByDestination(String destination) {
        return ticketRepository.findByDestinationAddressContainingIgnoreCase(destination);
    }

    public List<FlightTicket> searchByKickoff(String kickoff) {
        return ticketRepository.findByKickoffAddressContainingIgnoreCase(kickoff);
    }
}
