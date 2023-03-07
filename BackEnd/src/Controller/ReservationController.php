<?php

namespace App\Controller;

use App\Entity\Reservation;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ReservationController.php',
        ]);
    }




    #[Route('/listReservation', name: 'listReservation')]
    public function listusers(ManagerRegistry $doctrine): Response
    {
        $reservations = $doctrine
            ->getRepository(Reservation::class)
            ->findAll();

        $data = [];

        foreach ($reservations as $reservation) {
            $data[] = [
                'id' => $reservation->getId(),
                'ref' => $reservation->getRef(),
                'nomClient' => $reservation->getNomClient(),
                'Date' => $reservation->getDate(),

            ];
        }


        return $this->json($data);
    }




    #[Route('/addReservation', name: 'addReservation', methods: "POST")]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
        $reservation = new Reservation();

        $perametre = json_decode($request->getContent(), true);
        $reservation->setRef($perametre['ref']);
        $reservation->setNomClient($perametre['nomClient']);
        $reservation->setDate(new \DateTime('now'));

        $entityManager->persist($reservation);
        $entityManager->flush();

        return $this->json('Created new reservation successfully with id ' . $reservation->getId() . ' at ' . $reservation->getDate()->format('d/m/Y H:i:s'));
    }






    #[Route('/ByReservation/{id}', name: 'ByReservation', methods: "GET")]
    public function showByReservation(ManagerRegistry $doctrine, int $id): Response
    {
        $reservation = $doctrine->getRepository(Reservation::class)->find($id);

        if (!$reservation) {

            return $this->json('No reservation found for id' . $id, 404);
        }

        $data =  [
            'id' => $reservation->getId(),
            'ref' => $reservation->getRef(),
            'nomClient' => $reservation->getNomClient(),
            'Date' => $reservation->getDate(),

        ];

        return $this->json($data);
    }





    #[Route('/EditReservation/{id}', name: 'EditReservation', methods: "PUT")]
    public function editReservation(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        $perametre = json_decode($request->getContent(), true);

        if (!$reservation) {
            return $this->json('No reservation found for id' . $id, 404);
        }
        if (isset($perametre['ref'])) {
            $reservation->setRef($perametre['ref']);
        }
        if (isset($perametre['nomClient'])) {
            $reservation->setNomClient($perametre['nomClient']);
        }
        if (isset($perametre['Date'])) {
            $reservation->setDate(new \DateTime($perametre['Date']));
        }
        $entityManager->flush();

        $data =  [
            'id' => $reservation->getId(),
            'ref' => $reservation->getRef(),
            'nomClient' => $reservation->getNomClient(),
            'Date' => $reservation->getDate(),

        ];

        return $this->json($data);
    }




    #[Route('/DeleteReservation/{id}', name: 'DeleteReservation', methods: "DELETE")]
    public function deleteReservation(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        if (!$reservation) {
            return $this->json('No reservation found for id' . $id, 404);
        }

        $entityManager->remove($reservation);
        $entityManager->flush();

        return $this->json('Deleted a project successfully with id ' . $id);
    }
}
