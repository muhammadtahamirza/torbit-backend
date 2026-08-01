-- CreateTable
CREATE TABLE "offers" (
    "offer_id" SERIAL NOT NULL,
    "owner_id" INTEGER,
    "car_name" VARCHAR(255) NOT NULL,
    "seats_available" INTEGER NOT NULL,
    "monthly_per_person" DECIMAL NOT NULL,
    "pickup_points" JSONB NOT NULL,
    "destination" VARCHAR(255) DEFAULT 'CFD Campus',
    "departure_time" TIME(6) NOT NULL,
    "arrival_time" TIME(6) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) DEFAULT 'active',

    CONSTRAINT "offers_pkey" PRIMARY KEY ("offer_id")
);

-- CreateTable
CREATE TABLE "requests" (
    "request_id" SERIAL NOT NULL,
    "offer_id" INTEGER,
    "passenger_id" INTEGER,
    "status" VARCHAR(20) DEFAULT 'pending',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(20),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "otp_code" VARCHAR(6),
    "otp_expiry" TIMESTAMP(6),
    "is_verified" BOOLEAN DEFAULT false,
    "google_id" VARCHAR(255),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "contact" VARCHAR(20),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "wanted_ride_requests" (
    "request_id" SERIAL NOT NULL,
    "wanted_id" INTEGER,
    "driver_id" INTEGER,
    "status" VARCHAR(20) DEFAULT 'pending',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wanted_ride_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "wanted_rides" (
    "wanted_id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "pickup_points" JSONB NOT NULL,
    "destination" VARCHAR(255) DEFAULT 'FAST CFD Campus',
    "departure_time" TIME(6) NOT NULL,
    "arrival_time" TIME(6) NOT NULL,
    "monthly_budget" DECIMAL NOT NULL,
    "seats_needed" INTEGER DEFAULT 1,
    "status" VARCHAR(20) DEFAULT 'active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wanted_rides_pkey" PRIMARY KEY ("wanted_id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requests_offer_id_passenger_id_key" ON "requests"("offer_id", "passenger_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wanted_ride_requests_wanted_id_driver_id_key" ON "wanted_ride_requests"("wanted_id", "driver_id");

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("offer_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wanted_ride_requests" ADD CONSTRAINT "wanted_ride_requests_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wanted_ride_requests" ADD CONSTRAINT "wanted_ride_requests_wanted_id_fkey" FOREIGN KEY ("wanted_id") REFERENCES "wanted_rides"("wanted_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wanted_rides" ADD CONSTRAINT "wanted_rides_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
