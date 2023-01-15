class Triangle {
    generate(p_, q_, cos) {
        const p = q_ * (1 - 2 * cos) - p_;
        const q = p_ + q_;
        
        const A = q_ * (q - p);
        const B = q * (q_ - p_);
        const C = q * q_ - p * p_;

        return {A, B, C, angle: Math.acos(cos) * 180 / Math.PI, matrix: [[p, p_], [q, q_]]};
    }

    draw(ctx, shape) {
        const min = Math.min(shape.A, shape.B);
        const max = Math.max(shape.A, shape.B);
        const resize = 200;
        const cx = (ctx.canvas.width - resize) / 2;
        const cy = 30;

        const angleRight = Math.acos((max*max + shape.C*shape.C - min*min) / (2*max*shape.C));

        ctx.beginPath();
        ctx.arc(cx, cy, 15, 0, shape.angle * Math.PI / 180);

        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + resize, cy);
        ctx.lineTo(
            cx + resize * min * Math.cos(shape.angle * Math.PI / 180) / max,
            cy + resize * min * Math.sin(shape.angle * Math.PI / 180) / max
        );
        ctx.lineTo(cx, cy);
        ctx.stroke();

        ctx.save();

        ctx.translate(cx, cy);
        ctx.fillText(
            max,
            (resize - ctx.measureText(max).width) / 2,
            -4
        );
        ctx.restore();
        ctx.save();

        ctx.translate(
            cx + resize * min * Math.cos(shape.angle * Math.PI / 180) / max,
            cy + resize * min * Math.sin(shape.angle * Math.PI / 180) / max
        );
        ctx.rotate((shape.angle - 180) * Math.PI / 180);
        ctx.fillText(
            min,
            (min * resize / max - ctx.measureText(min).width) / 2,
            -4
        );
        ctx.restore();
        ctx.save();

        ctx.translate(
            cx + resize * min * Math.cos(shape.angle * Math.PI / 180) / max,
            cy + resize * min * Math.sin(shape.angle * Math.PI / 180) / max
        );
        ctx.rotate(-angleRight);
        ctx.fillText(
            shape.C,
            (shape.C * resize / max - ctx.measureText(min).width) / 2,
            16
        );
        ctx.restore();
    }
}

export default Triangle;
