const connect = require("../db/connect");

module.exports = class controllerReserva {
  static async cadastraReserva(req, res) {
    const { data, horario_inicio, horario_fim, fk_id_sala, idUsuario } = req.body;

    if (!data || !horario_inicio || !horario_fim || !fk_id_sala || !idUsuario) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos." });
    }

    if (horario_inicio >= horario_fim) {
      return res
        .status(400)
        .json({
          error: "O horário de início deve ser menor que o horário de fim.",
        });
    }

    // Validação para verificar conflitos de horário
      const queryHorario = `SELECT horario_inicio, horario_fim FROM reserva WHERE fk_id_sala = ? and not ((?i < horario_inicio and ?f <= horario_inicio) or (?i >= horario_fim and ?f > horario_fim))`
    const horarioValues = [
        fk_id_sala,
        horario_inicio,
        horario_fim,
        horario_inicio,
        horario_fim
    ];

    try {
      connect.query(queryHorario, horarioValues, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ error: "Já existe uma reserva para este horário." });
        }

        // Caso não haja conflito, insere a reserva
        const query = `INSERT INTO reserva (data, horario_inicio, horario_fim, fk_id_sala, idUsuario) VALUES (?, ?, ?, ?, ?)`;
        const values = [data, horario_inicio, horario_fim, fk_id_sala, idUsuario];

        connect.query(query, values, function (err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro Interno do Servidor" });
          }
          return res
            .status(201)
            .json({ message: "Reserva criada com sucesso." });
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  static async mostraReservas(req, res) {
    const query = `SELECT * FROM reserva`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        return res.status(200).json({
          message: "Listando reservas cadastradas:",
          reservas: results,
        });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  static async atualizaReserva(req, res) {
    const { id_reserva, data, horario_inicio, horario_fim, fk_id_sala, fk_id_usuario } =
      req.body;

    if (
      !id_reserva ||
      !data ||
      !horario_inicio ||
      !horario_fim ||
      !fk_id_sala ||
      !fk_id_usuario
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos." });
    }

    if (horario_inicio >= horario_fim) {
      return res
        .status(400)
        .json({
          error: "O horário de início deve ser menor que o horário de fim.",
        });
    }

    // Validação para verificar conflitos de horário ao atualizar
    const queryHorario = `SELECT horario_inicio, horario_fim FROM reserva WHERE fk_id_sala = ? and not ((?i < horario_inicio and ?f <= horario_inicio) or (?i >= horario_fim and ?f > horario_fim))`
    const horarioValues = [
        fk_id_sala,
        horario_inicio,
        horario_fim,
        horario_inicio,
        horario_fim
    ];

    try {
      connect.query(queryHorario, horarioValues, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ error: "Já existe uma reserva para este horário." });
        }

        // Caso não haja conflito, atualiza a reserva
        const query = `UPDATE reserva SET data = ?, horario_inicio = ?, horario_fim = ?, fk_id_sala = ?, idUsuario = ? WHERE idReserva = ?`;
        const values = [
          data,
          horario_inicio,
          horario_fim,
          fk_id_sala,
          fk_id_usuario,
          id_reserva,
        ];

        connect.query(query, values, function (err, results) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro Interno do Servidor" });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Reserva não encontrada." });
          }
          return res
            .status(200)
            .json({ message: "Reserva atualizada com sucesso." });
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  static async removeReserva(req, res) {
    const id_reserva = req.params.id;
    const query = `DELETE FROM reserva WHERE id_reserva = ?`;

    try {
      connect.query(query, [id_reserva], function (err, results) {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Erro Interno do Servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Reserva não encontrada." });
        }
        return res
          .status(200)
          .json({ message: "Reserva removida com sucesso." });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

};
