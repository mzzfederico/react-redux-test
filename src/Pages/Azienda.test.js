import { reducer } from "./Azienda"

test("reducer Azienda aumenta al passaggio di azione aumentaNumero", () => {
    expect(
        reducer({ counter: 10 }, { type: "aumentaNumero" })
    ).toStrictEqual({ counter: 11, isPrime: true });
})