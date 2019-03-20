/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */



/**
 * Custom blocks
 */




//% weight=100 color=#0fbc11 icon=""
namespace omni_3wheels {

    let left_wheel_force = 0;
    let right_wheel_force = 0;
    let back_wheel_force = 0;
    let rotate = 0;
    let lsb = 0;
    let last_two_digital = 0;
    let red_btn = 0;
    let green_btn = 0;


    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */


    //% block
    export function omni_3wheels(x: number, y: number, red_btn: number, green_btn: number): void {
        // Add code here
        //x = x - 50;
        //y = y - 50;
        rotate = 0;
        if (red_btn == 1)
            rotate = 50
        else if (green_btn == 1)
            rotate = -50
        else if (red_btn & green_btn)
            rotate = 0;
        //serial.writeValue("x=", x)
        //serial.writeValue("y=", y)
        //serial.writeValue("rotate = ", rotate)
        right_wheel_force = right_force(x, y, rotate);
        left_wheel_force = left_force(x, y, rotate);
        back_wheel_force = back_force(x, y, rotate);
        motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);




    }
    //%block
    //%starting_angle.min=0 starting_angle.max=355 finish_angle.min=0 finish_angle.max=355 rotate.min=-50 rotate.max=50
    export function circle_move(radius: number, starting_angle: number, finish_angle: number, rotate: number, clockwise: boolean): void {

        let sin_table = [0, 872, 1736, 2588, 3420, 4226, 5000, 5736, 6428, 7071, 7660, 8191, 8660, 9063, 9397, 9659, 9848, 9962, 10000,
            9962, 9848, 9659, 9397, 9063, 8660, 8191, 7660, 7071, 6428, 5736, 5000, 4226, 3420, 2588, 1736, 872,
            -872, -1736, -2588, -3420, -4226, -5000, -5736, -6428, -7071, -7660, -8191, -8660, -9063, -9397, -9659, -9848, -9962, -10000,
            -9962, -9848, -9659, -9397, -9063, -8660, -8191, -7660, -7071, -6428, -5736, -5000, -4226, -3420, -2588, -1736, -872, 0];

        let cos_table = [10000, 9962, 9848, 9659, 9397, 9063, 8660, 8191, 7660, 7071, 6428, 5736, 5000, 4226, 3420, 2588, 1736, 872, 0,
            -872, -1736, -2588, -3420, -4226, -5000, -5736, -6428, -7071, -7660, -8191, -8660, -9063, -9397, -9659, -9848, -9962,
            -9962, -9848, -9659, -9397, -9063, -8660, -8191, -7660, -7071, -6428, -5736, -5000, -4226, -3420, -2588, -1736, -872, 0,
            872, 1736, 2588, 3420, 4226, 5000, 5736, 6428, 7071, 7660, 8191, 8660, 9063, 9397, 9659, 9848, 9962
        ];


        let i = 0;
        let j = 0;
        starting_angle = starting_angle / 5
        finish_angle = finish_angle / 5
        if (clockwise == false) {
            for (i = starting_angle; i < finish_angle; i++) {
                x = 50 * sin_table[i] / 10000;
                y = 50 * cos_table[i] / 10000;



                right_wheel_force = right_force(x, y, rotate);
                left_wheel_force = left_force(x, y, rotate);
                back_wheel_force = back_force(x, y, rotate);
                motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);
                basic.pause(radius * 10);
            }
        } else {


            for (i = starting_angle; i > finish_angle; i--) {
                x = 50 * sin_table[i] / 10000;
                y = 50 * cos_table[i] / 10000;
            }


            right_wheel_force = right_force(x, y, rotate);
            left_wheel_force = left_force(x, y, rotate);
            back_wheel_force = back_force(x, y, rotate);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);
            basic.pause(radius * 10);


        }






    }

    //%block
    export function stop() {
        right_wheel_force = right_force(0, 0, 0);
        left_wheel_force = left_force(0, 0, 0);
        back_wheel_force = back_force(0, 0, 0);
        motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);

    }
    //%block
    //%speed.min=0 speed.max=90
    export function rotate_from_center(speed: number, clockwise: boolean): void {
        if (clockwise == true) {

            right_wheel_force = right_force(0, 0, speed);
            left_wheel_force = left_force(0, 0, speed);
            back_wheel_force = back_force(0, 0, speed);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);

        } else {

            right_wheel_force = right_force(0, 0, -speed);
            left_wheel_force = left_force(0, 0, -speed);
            back_wheel_force = back_force(0, 0, -speed);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);

        }




    }
    //%block
    //%speed.min=0 speed.max=50
    export function move_forward(speed: number): void {
        if (speed >= 0 && speed <= 50) {
            let x = speed;

            right_wheel_force = right_force(x, 0, 0);
            left_wheel_force = left_force(x, 0, 0);
            back_wheel_force = back_force(x, 0, 0);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);

        }
    }
    //%block
    //%speed.min=0 speed.max=50
    export function move_backward(speed: number): void {

        if (speed >= 0 && speed <= 50) {
            let x = speed;

            right_wheel_force = right_force(-x, 0, 0);
            left_wheel_force = left_force(-x, 0, 0);
            back_wheel_force = back_force(-x, 0, 0);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);
        }
    }
    //%block
    //%speed.min=0 speed.max=50 
    export function move_right(speed: number): void {

        if (speed >= 0 || speed <= 50) {
            let y = speed;

            right_wheel_force = right_force(0, y, 0);
            left_wheel_force = left_force(0, y, 0);
            back_wheel_force = back_force(0, y, 0);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);
        }

    }

    //%block
    //%speed.min=0 speed.max=50
    export function move_left(speed: number): void {

        if (speed >= 0 || speed <= 50) {
            let y = speed;

            right_wheel_force = right_force(0, -y, 0);
            left_wheel_force = left_force(0, -y, 0);
            back_wheel_force = back_force(0, -y, 0);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);
        }

    }
    //%block
    //%angle.min=5 angle.max=355 
    export function move_for_angle(angle: number, speed: number): void {
        {
            let sin_table = [872, 1736, 2588, 3420, 4226, 5000, 5736, 6428, 7071, 7660, 8191, 8660, 9063, 9397, 9659, 9848, 9962, 10000,
                9962, 9848, 9659, 9397, 9063, 8660, 8191, 7660, 7071, 6428, 5736, 5000, 4226, 3420, 2588, 1736, 872,
                -872, -1736, -2588, -3420, -4226, -5000, -5736, -6428, -7071, -7660, -8191, -8660, -9063, -9397, -9659, -9848, -9962, -10000,
                -9962, -9848, -9659, -9397, -9063, -8660, -8191, -7660, -7071, -6428, -5736, -5000, -4226, -3420, -2588, -1736, -872];

            let cos_table = [9962, 9848, 9659, 9397, 9063, 8660, 8191, 7660, 7071, 6428, 5736, 5000, 4226, 3420, 2588, 1736, 872, 0,
                -872, -1736, -2588, -3420, -4226, -5000, -5736, -6428, -7071, -7660, -8191, -8660, -9063, -9397, -9659, -9848, -9962,
                -9962, -9848, -9659, -9397, -9063, -8660, -8191, -7660, -7071, -6428, -5736, -5000, -4226, -3420, -2588, -1736, -872, 0,
                872, 1736, 2588, 3420, 4226, 5000, 5736, 6428, 7071, 7660, 8191, 8660, 9063, 9397, 9659, 9848, 9962
            ];
            angle = angle / 5;
            if (speed >= 0 || speed <= 50) {
                x = speed * sin_table[angle] / 10000;
                y = speed * cos_table[angle] / 10000;
            }
            right_wheel_force = right_force(x, y, 0);
            left_wheel_force = left_force(x, y, 0);
            back_wheel_force = back_force(x, y, 0);
            motor_moving(left_wheel_force, right_wheel_force, back_wheel_force);


        }




    }











    export function motor_moving(L_Wheel: number, R_Wheel: number, B_wheel: number) {

        if (R_Wheel >= 0) {

            pins.analogWritePin(AnalogPin.P16, pins.map(right_wheel_force, 0, 31, 0, 1023))
            pins.digitalWritePin(DigitalPin.P0, 0)
        }
        else {
            pins.analogWritePin(AnalogPin.P0, pins.map(right_wheel_force, 0, -31, 0, 1023))
            pins.digitalWritePin(DigitalPin.P16, 0)


        }
        if (L_Wheel >= 0) {
            pins.analogWritePin(AnalogPin.P12, pins.map(left_wheel_force, 0, 31, 0, 1023))
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
        else {


            pins.analogWritePin(AnalogPin.P8, pins.map(left_wheel_force, 0, -31, 0, 1023))
            pins.digitalWritePin(DigitalPin.P12, 0)

        }

        if (B_wheel >= 0) {


            pins.analogWritePin(AnalogPin.P1, pins.map(back_wheel_force, 0, 31, 0, 1023))
            pins.digitalWritePin(DigitalPin.P2, 0)
        }
        else {
            pins.analogWritePin(AnalogPin.P2, pins.map(back_wheel_force, 0, -31, 0, 1023))
            pins.digitalWritePin(DigitalPin.P1, 0)

        }








    }

    export function right_force(x: number, y: number, rotate: number): number {

        let temp: number;

        temp = x * 58 / 100 - y * 33 / 100 + rotate * 33 / 100;
        return temp;

    }
    export function left_force(x: number, y: number, rotate: number): number {

        let temp: number;

        temp = -x * 58 / 100 - y * 33 / 100 + rotate * 33 / 100;
        return temp;

    }

    export function back_force(x: number, y: number, rotate: number): number {

        let temp: number;

        temp = y * 66 / 100 + rotate * 33 / 100;
        return temp;

    }
}