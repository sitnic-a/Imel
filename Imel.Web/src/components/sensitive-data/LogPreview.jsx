import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuditLogs } from "../../redux-toolkit/features/auditSlice";
import moment from "moment";
import { Loader } from "../shared/Loader";

export const LogPreview = () => {
  let dispatch = useDispatch();
  let { logs, isLoading } = useSelector((store) => store.audit);
  let { paginationParams } = useSelector((store) => store.pagination);

  let query = null;

  useEffect(() => {
    dispatch(getAuditLogs([query, paginationParams]));
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section id="logs">
      <section className="main-logs">
        <header>
          <h1>Audit log list</h1>
          <p className="subtitle">
            Dobrošli na prikaz svih logova sa baze podataka, pristup ovome
            dijelu aplikacije posjeduje isključivo administrator aplikacije
          </p>
          <p className="subtitle">
            Na ovom dijelu moguće je vidjeti koja osoba, sa kojom
            rolom(funkcijom) te putem koje metode i kada je manipulisala
            podacima baze podataka
          </p>
        </header>
        {logs.length > 0 ? (
          <table className="log-table" cellSpacing={5}>
            <thead>
              <tr>
                <th className="changedBy-thead">Initiator</th>
                <th className="role-thead">Role</th>
                <th className="method-thead">Method</th>
                <th className="original-thead">Changed From</th>
                <th className="new-thead">Changed To</th>
                <th className="create-at-as-string-thead">Created</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => {
                let date = moment(log.loggedAt).format("MMMM DD, YYYY-hh:mm");
                return (
                  <tr className="log-container" key={log.id}>
                    <td className="log-value changedBy">{log.changedBy}</td>
                    <td className="log-value role">{log.role}</td>
                    <td className="log-value method">{log.method}</td>
                    <td className="log-value original">{log.originalValue}</td>
                    <td className="log-value new">{log.currentValue}</td>
                    <td className="log-value logged-as-string">{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No logs made</p>
        )}
      </section>
    </section>
  );
};
